import { DIRECTION_IDS } from '@/lib/seed';
import DirectionPageClient from './DirectionPageClient';

export function generateStaticParams() {
  return DIRECTION_IDS.map((id) => ({ id }));
}

export default async function DirectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DirectionPageClient id={id} />;
}
