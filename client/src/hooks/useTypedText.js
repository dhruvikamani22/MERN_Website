import { useEffect, useState } from "react";

/**
 * Lightweight re-implementation of a typed.js style effect,
 * cycling through a list of strings, typing and deleting them.
 */
export default function useTypedText(strings, { typeSpeed = 100, backSpeed = 60, backDelay = 1000 } = {}) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index % strings.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), backDelay);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), backSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, strings, typeSpeed, backSpeed, backDelay]);

  return text;
}
