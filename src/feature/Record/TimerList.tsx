import { SelectTimerProps, timerList } from "./timer-list"

interface TimerListProps {
  setTimer: React.Dispatch<React.SetStateAction<SelectTimerProps>>
  timerState: SelectTimerProps
}
const TimerList = ({ setTimer, timerState }: TimerListProps) => {
  return (
    <div className="flex gap-2">
      {timerList.map((timer) => {
        return (
          <button key={timer.time}
            className={`${timerState.time == timer.time && "bg-blue-500 text-white border-none"} border-2 border-blue-400 px-2 py-1 rounded-lg font-bold`}
            onClick={() => { setTimer(timer) }}>
            {timer.title}
          </button>
        )
      })
      }
    </div>

  )
}

export default TimerList