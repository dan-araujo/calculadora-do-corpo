import { useContext } from 'react';
import { FormValidationContext } from './calculator-form';
import { FIELD_LIMITS, numberError } from '../lib/validation.mjs';

export default function NumericInput({ field, value, onChange, className = '', required = true,
  id, 'aria-describedby': describedBy, 'aria-invalid': ariaInvalid, ...props }) {
  const rule = FIELD_LIMITS[field];
  const validation = useContext(FormValidationContext);
  const invalid = Boolean(id && validation?.invalidFieldId === id);
  const descriptions = [describedBy, invalid ? validation.errorId : null].filter(Boolean).join(' ');

  function update(event, candidate) {
    const raw = candidate.replace(',', '.');
    const pattern = rule.decimals ? /^\d*(?:\.\d?)?$/ : /^\d*$/;
    if (!pattern.test(raw) || raw.length > String(rule.max).length + (rule.decimals ? 2 : 0) || Number(raw) > rule.max || (raw === '0' && rule.min >= 1)) return;
    onChange({ ...event, target: { ...event.target, value: raw } });
  }

  return <span className={`campo-numerico ${className}`}>
    <input {...props} id={id} type="text" inputMode={rule.decimals ? 'decimal' : 'numeric'}
      aria-invalid={invalid ? true : ariaInvalid} aria-describedby={descriptions || undefined}
      className="entrada-numerica" value={value} required={required}
      ref={node => { if (node) node.setCustomValidity(numberError(value, field)); }}
      onInvalid={event => event.preventDefault()}
      onBlur={event => {
        // Permite os dígitos intermediários de 175, por exemplo, mas não
        // mantém uma medida abaixo do mínimo ao terminar o preenchimento.
        if (value !== '' && numberError(value, field)) onChange({ ...event, target: { ...event.target, value: '' } });
      }}
      onChange={event => update(event, event.target.value)}
      onPaste={event => {
        event.preventDefault();
        const input = event.target;
        const candidate = String(value).slice(0, input.selectionStart) + event.clipboardData.getData('text').trim() + String(value).slice(input.selectionEnd);
        // Colagem é uma entrada completa: recusa também valores abaixo do mínimo.
        if (numberError(candidate, field)) return;
        update(event, candidate);
      }} />
  </span>;
}
