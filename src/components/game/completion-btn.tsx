import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore, usePlayStore } from '@/store';
import { cn, constGameProgress } from '@/lib/utils';
import { ShinyButton } from '@/components/ui/shiny-button';
import { useGameResult } from '@/hooks/api/mutation';
import ResultModel from './result-model';


const CompletionButton: React.FC = () => {
  const answers = useGameStore((s) => s.answers);
  const sessionId = useGameStore((s) => s.sessionId);
  const { activeZone } = usePlayStore()

  const { mutate, data, isPending, reset } = useGameResult();

  const pct = constGameProgress(answers.length);
  const done = pct === 100

  const resultData = data?.data ?? null;
  const modalOpen = isPending || !!resultData;

  const handleClick = () => {
    if (!sessionId) return;
    mutate(sessionId);
  }

  const handleClose = () => {
    reset();
  }


  return (
    <>
      <AnimatePresence>
        {done && !activeZone && !modalOpen && (
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

      <ResultModel
        open={modalOpen}
        onClose={handleClose}
        data={resultData}
        isPending={isPending}
      />
    </>
  )
}

export default CompletionButton