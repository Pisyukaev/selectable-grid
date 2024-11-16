import { useState } from "react";

export function useAboba() {
  const [v, z] = useState(0)
  return {
    v,
    z
  }
}
