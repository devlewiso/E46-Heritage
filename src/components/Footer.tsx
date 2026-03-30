export default function Footer() {
  return (
    <footer
      className="px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-6"
      style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}
    >
      <div className="text-[11px] font-bold tracking-[0.25em] text-white/28 uppercase">
        E46 Heritage
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-[9px] tracking-[0.2em] uppercase text-white/15">Follow the build</p>
        <a
          href="https://instagram.com/devlewiso"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.18em] text-[#c8a03c]/60 uppercase no-underline transition-colors duration-300 hover:text-[#c8a03c]"
        >
          @devlewiso
        </a>
      </div>
      <div className="text-[10px] text-white/15 tracking-[0.1em]">
        The Bimmer Vibes · 2003–2025
      </div>
    </footer>
  )
}
