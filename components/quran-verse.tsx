export default function QuranVerse({
  arabic,
  translation,
  reference,
}: { arabic: string; translation: string; reference: string }) {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-3xl md:text-4xl font-arabic leading-relaxed mb-4 text-gold">{arabic}</p>
      <p className="text-xl md:text-2xl mb-2 text-white">"{translation}"</p>
      <p className="text-sm text-emerald-200">{reference}</p>
    </div>
  )
}
