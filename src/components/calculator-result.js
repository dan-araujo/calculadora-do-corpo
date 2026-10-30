export default function CalculatorResult({ visible, children, ...props }) {
  return <div role="status" aria-live="polite" aria-atomic="true">
    {visible && <div className="resultado" {...props}>{children}</div>}
  </div>;
}
