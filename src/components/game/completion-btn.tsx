import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { useGameStore, usePlayStore } from '@/store';
import { useToast } from '@/hooks/use-toast';
import { useGameResult } from '@/hooks/api/mutation';
import { cn, constGameProgress } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_REGISTRY } from '@/constants/api-registery';

import FullScreenLoader from '@/components/common/full-screen-loader';
import { ShinyButton } from '@/components/ui/shiny-button';
import { RESULT_LOADER_LINES } from "@/constants/result-data";

const SUBMIT_LINES = [
  "Sealing the envelope...",
  "Counting your choices...",
  "Sending to the oracle...",
  ...RESULT_LOADER_LINES,
];


const CompletionButton: React.FC = () => {
  const router = useRouter()
  const answers = useGameStore((s) => s.answers);
  const sessionId = useGameStore((s) => s.sessionId);
  const setIsCompleted = useGameStore((s) => s.setIsCompleted);
  const { activeZone } = usePlayStore()

  const { mutate, isPending } = useGameResult();
  const toast = useToast()

  const pct = constGameProgress(answers.length);
  const done = pct === 100

  const queryClient = useQueryClient();

  const handleClick = () => {
    if (!sessionId || isPending) return;
    mutate(sessionId, {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_REGISTRY.getResult, sessionId], data);
        setIsCompleted(true)
        router.push(`/results?session=${sessionId}`)
      },
      onError: (error) => {
        toast.error("Faild to submit", error.message)
      }
    });
  }


  return (
    <>
      <AnimatePresence>
        {done && !activeZone && !isPending && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-xs px-4"
          >
            <ShinyButton
              variant="default"
              className={cn(
                "w-full rounded-full tracking-wide h-auto group gap-0",
                "py-4 text-base font-bold shadow-md"
              )}
              onClick={handleClick}
            >
              See Your Results
            </ShinyButton>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPending && <FullScreenLoader lines={SUBMIT_LINES} />}
      </AnimatePresence>
    </>
  )
}

export default CompletionButton