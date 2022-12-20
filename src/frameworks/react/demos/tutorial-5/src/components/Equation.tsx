import { useReactive } from "@starbeam/react";

export function Equation({
  counters,
}: {
  counters: { name: string; count: number }[];
}) {
  return useReactive(() => {
    const last = counters.length - 1;
    const total = counters.reduce((sum, { count }) => sum + count, 0);

    return (
      <pre>
        {counters.map(({ name, count }, i) => (
          <Counter key={name} name={name} count={count} isLast={i === last} />
        ))}
        <hr />
        <span className="total">{total}</span>
        <span className="label">total</span>
      </pre>
    );
  });
}

function Counter({
  name,
  count,
  isLast,
}: {
  name: string;
  count: number;
  isLast: boolean;
}) {
  return (
    <>
      <span className="operand">{count}</span>
      <span className="label">{name}</span>
      {isLast ? null : <span className="operator">+</span>}
    </>
  );
}
