import { usePlayground } from "../contexts/PlaygroundContext"

export default function PlayButton() {
  const { loading, setShouldRunCode } = usePlayground()

  return (
    <button
      key={loading}
      type="button"
      onClick={() => setShouldRunCode(true)}
      className={"absolute top-1 -left-12 z-50  hover:text-cyan-500 " + (loading ? "animate-spin text-cyan-500" : "text-gray-500")}>
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </button>
  )
}
