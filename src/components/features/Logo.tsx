import logoMark from '@/assets/home/logo-mark.svg'
import logoMarkLight from '@/assets/home/logo-mark-light.svg'
import logoWord from '@/assets/home/logo-word.svg'
import logoWordLight from '@/assets/home/logo-word-light.svg'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="relative block h-16 w-[66px]">
      <img src={light ? logoMarkLight : logoMark} alt="" className="absolute inset-x-0 top-0 h-12 w-full object-contain" />
      <img src={light ? logoWordLight : logoWord} alt="Occitanica" className="absolute bottom-0 left-[2%] h-auto w-[95%]" />
    </span>
  )
}
