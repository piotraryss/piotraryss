import React, { useState, useEffect } from 'react'
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md"

interface IThemeSelector {
	defaultThemeId: string
	themeId: string
	setThemeId: Function
	getThemeId: Function
}

export var IThemeSelector: IThemeSelector = {
	defaultThemeId: "light",
	themeId: "",
	setThemeId: () => {},
	getThemeId: () => {}
}

export default function ThemeSelector() {

	const [themeId, setThemeId] = useState("" as string)

	IThemeSelector.setThemeId = (themeId: string): void => {
		setThemeId(themeId)
	}

	IThemeSelector.getThemeId = (): string => {
		var sThemeId = localStorage.getItem("themeId") ? localStorage.getItem("themeId") as string : IThemeSelector.defaultThemeId
		// console.log(`getThemeId = ${sThemeId}`)
		if(sThemeId.length == 0)
			sThemeId = IThemeSelector.defaultThemeId
		return sThemeId
	}

	useEffect(() => {
		document.body.classList.remove(`theme-`)
		document.body.classList.remove(`theme-dark`)
		document.body.classList.remove(`theme-light`)
		if(themeId.length == 0) {
			setThemeId(IThemeSelector.getThemeId())
			return
		}
		const sThemeId = themeId
		localStorage.setItem("themeId", sThemeId)
		document.body.classList.add(`theme-${sThemeId}`)
		IThemeSelector.themeId = sThemeId
	}, [themeId])

	function setTheme(themeId: string = ""): any {
		setThemeId(themeId)
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
				{themeId == "dark" ? (
					<button className="wrapper" onClick={() => setTheme("light")}>
						<MdOutlineDarkMode />
					</button>
				) : (
					<button className="wrapper" onClick={() => setTheme("dark")}>
						<MdDarkMode />
					</button>
				)}
			</div>
		</>
	)
}
