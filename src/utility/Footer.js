import '../renderer/App.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_first_box">
        <span className="underline">BACK</span>
        <span className="underline">HELP</span>
      </div>
      <div className="footer_second_box">
        <span className="underline">TUTORIALS</span>
        <div id="footer_second_box_second_span">
          <span className="underline">CONTINUE</span>
        </div>
      </div>
    </div>
  );
}
