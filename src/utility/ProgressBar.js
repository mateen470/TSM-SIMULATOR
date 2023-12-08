export default function ProgressBar({ value, onChange, max = 100 }) {
  const progressBarStyle = {
    width: `${value}%`,
  };

  return (
    <div className="progress_bar_and_value_main_container">
      <div className="progress_bar_container">
        <div className="progress_bar" style={progressBarStyle}></div>
      </div>
      <div className="progress_bar_value_box">{value}</div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="slider_progress"
        style={{ width: '400px' }}
      />
    </div>
  );
}
