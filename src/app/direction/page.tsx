'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DirectionPageClient from './[id]/DirectionPageClient';

function DirectionPageInner() {
  const params = useSearchParams();
  const id = params.get('id') ?? '';
  return <DirectionPageClient id={id} />;
}

export default function DirectionPage() {
  return (
    <Suspense>
      <DirectionPageInner />
    </Suspense>
  );
}
