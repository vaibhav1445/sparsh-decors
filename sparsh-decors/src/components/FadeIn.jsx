import { useFadeIn } from "../hooks/useAnimations";

export default function FadeIn({ children, style }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-in" style={style}>
      {children}
    </div>
  );
}
