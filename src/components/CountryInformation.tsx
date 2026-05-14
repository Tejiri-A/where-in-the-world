type Props = {
  label: string
  data: any
}

function CountryInformation({ data, label }: Props) {
  return (
    <p className="text-sm font-semibold leading-8 md:text-base">
      {label}: <span className="font-light">{data}</span>
    </p>
  )
}

export default CountryInformation
