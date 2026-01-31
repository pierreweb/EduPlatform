import './SectionDivider.css'

const SectionDivider = () => {
    return (
        <div className="section-divider">
            <svg
                className="waves"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className="parallax">
                    <use href="#gentle-wave" x="48" y="0" fill="oklch(65% 0.28 345 / 0.1)" />
                    <use href="#gentle-wave" x="48" y="3" fill="oklch(65% 0.28 345 / 0.2)" />
                    <use href="#gentle-wave" x="48" y="5" fill="oklch(65% 0.28 345 / 0.4)" />
                    <use href="#gentle-wave" x="48" y="7" fill="oklch(65% 0.28 345 / 0.7)" />
                </g>
            </svg>
        </div>
    )
}

export default SectionDivider
