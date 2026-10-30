import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { scheduleIdleAfterLoad } from '../src/lib/schedule-idle.mjs';

function createHost({ loaded = false, idle = true } = {}) {
  const listeners = new Map();
  const pending = new Map();
  let nextId = 0;
  const host = {
    document: { readyState: loaded ? 'complete' : 'loading' },
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event, callback) => {
      if (listeners.get(event) === callback) listeners.delete(event);
    },
    setTimeout: (callback, delay) => {
      assert.equal(delay, 1);
      pending.set(++nextId, callback);
      return nextId;
    },
    clearTimeout: id => pending.delete(id),
  };
  if (idle) {
    host.requestIdleCallback = callback => {
      pending.set(++nextId, callback);
      return nextId;
    };
    host.cancelIdleCallback = id => pending.delete(id);
  }
  return {
    host, listeners, pending,
    load: () => {
      host.document.readyState = 'complete';
      listeners.get('load')?.();
    },
    run: () => {
      const callbacks = [...pending.values()];
      pending.clear();
      for (const callback of callbacks) callback();
    },
  };
}

describe('Agendamento após o carregamento', () => {
  it('deve aguardar o carregamento e a oportunidade ociosa antes de executar', () => {
    const browser = createHost();
    let calls = 0;
    scheduleIdleAfterLoad(() => calls++, browser.host);
    assert.equal(browser.pending.size, 0);
    browser.load();
    assert.equal(calls, 0);
    browser.run();
    assert.equal(calls, 1);
  });

  it('deve cancelar a espera antes de a página terminar de carregar', () => {
    const browser = createHost();
    let calls = 0;
    const cancel = scheduleIdleAfterLoad(() => calls++, browser.host);
    cancel();
    assert.equal(browser.listeners.size, 0);
    browser.load();
    browser.run();
    assert.equal(browser.pending.size, 0);
    assert.equal(calls, 0);
  });

  it('deve cancelar uma oportunidade ociosa já agendada', () => {
    const browser = createHost({ loaded: true });
    let calls = 0;
    const cancel = scheduleIdleAfterLoad(() => calls++, browser.host);
    assert.equal(browser.pending.size, 1);
    cancel();
    assert.equal(browser.pending.size, 0);
    browser.run();
    assert.equal(calls, 0);
  });

  it('deve ignorar uma execução já retirada da fila quando houver cancelamento', () => {
    const browser = createHost({ loaded: true });
    let calls = 0;
    const cancel = scheduleIdleAfterLoad(() => calls++, browser.host);
    const callback = [...browser.pending.values()][0];
    cancel();
    callback();
    assert.equal(calls, 0);
  });
});

describe('Navegadores sem agendamento ocioso', () => {
  it('deve executar pelo temporizador após o carregamento', () => {
    const browser = createHost({ idle: false });
    let calls = 0;
    scheduleIdleAfterLoad(() => calls++, browser.host);
    assert.equal(browser.pending.size, 0);
    browser.load();
    assert.equal(calls, 0);
    browser.run();
    assert.equal(calls, 1);
  });

  it('deve cancelar o temporizador antes da execução', () => {
    const browser = createHost({ loaded: true, idle: false });
    let calls = 0;
    const cancel = scheduleIdleAfterLoad(() => calls++, browser.host);
    assert.equal(browser.pending.size, 1);
    cancel();
    assert.equal(browser.pending.size, 0);
    browser.run();
    assert.equal(calls, 0);
  });
});
