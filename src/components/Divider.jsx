import "./Divider.css"

export default function Divider({ direction='vertical '}) {
	return (
		<div className={'divider '+direction} />
	)
}