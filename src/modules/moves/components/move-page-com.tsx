import React from 'react';
import { MOVES_LIST } from '@/constants/moves-list';

import MoveHeader from './move-header';
import MoveExplanation from './move-explanation';
import MoveInteractive from './move-interactive';
import MoveAiInsights from './move-ai-insights';
import MoveExamples from './move-examples';
import { MovesType } from '@/type/move';

interface MovePageCompProps {
    slug: string;
}


const MovePageComp: React.FC<MovePageCompProps> = ({ slug }) => {
    const moveData = MOVES_LIST[slug as MovesType];

    if (!moveData) {
        return <div className="p-8 text-center text-error-500">Framework not found.</div>;
    }

    return (
        <div className="w-full container mx-auto flex flex-col pt-10 pb-24 gap-12 md:gap-20 overflow-x-hidden relative">
            <MoveHeader 
                title={moveData.title}
                description={moveData.description}
                categories={moveData.categories}
                time={moveData.time}
                // icon={moveData.icon}
            />

            <MoveExplanation slug={moveData.slug} />

            <MoveInteractive />

            <MoveAiInsights slug={moveData.slug} />

            <MoveExamples slug={moveData.slug} />
        </div>
    );
};

export default MovePageComp;