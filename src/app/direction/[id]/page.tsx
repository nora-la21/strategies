import { DIRECTION_IDS } from '@/lib/seed';
import DirectionPageClient from './DirectionPageClient';

export function generateStaticParams() {
  return DIRECTION_IDS.map((id) => ({ id }));
}

export default function DirectionPage({ params }: { params: { id: string } }) {
  return <DirectionPageClient id={params.id} />;
}
