function DisplayTime({hours, mins, secs}: {hours: string, mins: string, secs: string}) {
    return (
        <div className="inline-flex font-secondary">
        <span>{hours}</span>
        <span>:</span>
        <span>{mins}</span>
        <span>:</span>
        <span>{secs}</span>
      </div>
    )
}

export default DisplayTime
