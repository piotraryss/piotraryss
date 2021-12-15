import React, { useState, useEffect } from 'react'
import { TiZoomIn, TiZoomOut } from "react-icons/ti"

interface IZoom {
	defaultZoomFactor: number
	minZoomFactor: number
	maxZoomFactor: number
	zoomFactor: number
	zoomInDisabled: boolean
	zoomOutDisabled: boolean
	setZoom: Function
	getZoom: Function
	zoomIn: Function
	zoomOut: Function
}

export var IZoom: IZoom = {
	defaultZoomFactor: 1,
	minZoomFactor: 0.8,
	maxZoomFactor: 1.2,
	zoomFactor: 0,
	zoomInDisabled: false,
	zoomOutDisabled: false,
	setZoom: () => {},
	getZoom: () => {},
	zoomIn: () => {},
	zoomOut: () => {}
}

export default function Zoom() {

	const [zoomFactor, setZoomFactor] = useState(-1 as number)
	const [zoomInDisabled, setZoomInDisabled] = useState(false as boolean)
	const [zoomOutDisabled, setZoomOutDisabled] = useState(false as boolean)

	IZoom.setZoom = (zoomFactor: number): void => {
		if(zoomFactor < IZoom.minZoomFactor || zoomFactor > IZoom.maxZoomFactor)
			return
		setZoom(zoomFactor)
	}

	IZoom.getZoom = (): number => {
		var sZoomFactor = localStorage.getItem("zoomFactor") ? parseFloat(localStorage.getItem("zoomFactor") as string) : IZoom.defaultZoomFactor
		// console.log(`getZoom = ${sZoomFactor}`)
		if(isNaN(sZoomFactor) || sZoomFactor <= 0)
			sZoomFactor = IZoom.defaultZoomFactor
		return sZoomFactor
	}

	IZoom.zoomIn = (diff: number = 0.1): void => {
		var newZoomLevel = Number((zoomFactor + diff).toFixed(1))
		IZoom.setZoom(newZoomLevel)
	}

	IZoom.zoomOut = (diff: number = 0.1): void => {
		var newZoomLevel = Number((zoomFactor - diff).toFixed(1))
		IZoom.setZoom(newZoomLevel)
	}

	useEffect(() => {
		if(isNaN(zoomFactor) || zoomFactor <= 0) {
			setZoom(IZoom.getZoom())
			return
		}
		const sZoomFactor = zoomFactor
		localStorage.setItem("zoomFactor", String(sZoomFactor))
		document.documentElement.style.setProperty('--vct-multiplier', String(sZoomFactor))
		setZoomOutDisabled(sZoomFactor <= IZoom.minZoomFactor ? true : false)
		setZoomInDisabled(sZoomFactor >= IZoom.maxZoomFactor ? true : false)
		IZoom.zoomOutDisabled = zoomOutDisabled
		IZoom.zoomInDisabled = zoomInDisabled
		// console.log(`zoomOutDisabled: ${zoomOutDisabled}`)
		// console.log(`zoomInDisabled: ${zoomInDisabled}`)
		IZoom.zoomFactor = sZoomFactor
	}, [zoomFactor, zoomInDisabled, zoomOutDisabled])

	function setZoom(zoomFactor: number = 1): any {
		setZoomFactor(zoomFactor)
	}

	return (
		<>
			<style jsx>{`
			.container {
				display: flex;
				flex-direction: row;
				gap: var(--vct-gap);
			}
			.wrapper {
				display: flex;
				flex-direction: row;
				gap: 5px;
				align-items: center;
				justify-content: center;
			}
			`}</style>
			<div className="container">
				<button className="wrapper">
					{zoomOutDisabled == false ? (
						<TiZoomOut onClick={() => IZoom.zoomOut()} />
					) : (<></>)}
					<div>{String(zoomFactor)}</div>
					{zoomInDisabled == false ? (
						<TiZoomIn onClick={() => IZoom.zoomIn()} />
					) : (<></>)}
				</button>
			</div>
		</>
	)
}
