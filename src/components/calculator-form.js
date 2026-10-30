import { useState } from 'react';

export default function CalculatorForm({ onSubmit, onResetResult, children }) {
  const [error, setError] = useState('');
  const reset = () => { setError(''); onResetResult(); };
  return <form noValidate onChangeCapture={reset} onPasteCapture={reset}
    onSubmit={async event => {
      event.preventDefault();
      if (!event.currentTarget.checkValidity()) return;
      setError('');
      try { await onSubmit(event); }
      catch (failure) {
        onResetResult();
        setError(failure instanceof RangeError ? failure.message : 'Não foi possível calcular. Confira os dados informados.');
      }
    }}>
    {children}
    {error && <p className="erro-formulario" role="alert">{error}</p>}
  </form>;
}
