import { createContext, useId, useState } from 'react';

export const FormValidationContext = createContext(null);

export default function CalculatorForm({ onSubmit, onResetResult, children }) {
  const [error, setError] = useState('');
  const [invalidFieldId, setInvalidFieldId] = useState('');
  const errorId = useId();
  const reset = () => { setError(''); setInvalidFieldId(''); onResetResult(); };
  return <FormValidationContext.Provider value={{ invalidFieldId, errorId }}>
    <form noValidate onChangeCapture={reset} onPasteCapture={reset}
    onSubmit={async event => {
      event.preventDefault();
      if (!event.currentTarget.checkValidity()) {
        const invalidField = event.currentTarget.querySelector(':invalid');
        onResetResult();
        setError(invalidField.validationMessage);
        setInvalidFieldId(invalidField.id);
        invalidField.focus();
        return;
      }
      setError('');
      setInvalidFieldId('');
      try { await onSubmit(event); }
      catch (failure) {
        onResetResult();
        setError(failure instanceof RangeError ? failure.message : 'Não foi possível calcular. Confira os dados informados.');
      }
    }}>
    {children}
    {error && <p id={errorId} className="erro-formulario" role="alert">{error}</p>}
    </form>
  </FormValidationContext.Provider>;
}
