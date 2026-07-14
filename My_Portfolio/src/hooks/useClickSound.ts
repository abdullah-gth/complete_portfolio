import { useCallback, useRef, useEffect } from "react";
import clickSoundFile from "@/assets/clicksound.mp3";

export const useClickSound = (volume: number = 0.3) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(clickSoundFile);
    audioRef.current.volume = volume;
  }, [volume]);

  return useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
    });
  }, []);
};
