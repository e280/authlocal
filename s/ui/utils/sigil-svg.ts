
import {svg} from "lit"
import {hash} from "../../core/index.js"

/**
 * deterministic symbolic avatar
 *
 * params:
 * 0: family     [0..1]  motif species
 * 1: symmetry   [0..1]  radial repetition mode
 * 2: spread     [0..1]  how far the arms reach
 * 3: sharpness  [0..1]  angles / taper / aggression
 * 4: ornament   [0..1]  rings / dots / sparkle density
 */
export function sigilSvg(id: string) {
	const [a, b, c, d, e] = [...hash(id)]
		.slice(0, 5)
		.map(n => (n / 255))

	const family = Math.min(3, Math.floor(a * 4))
	const symmetry = [2, 4, 6, 8][Math.min(3, Math.floor(b * 4))]!

	const spread = lerp(18, 42, c)
	const sharp = d
	const ornament = e

	const stroke = lerp(2.2, 5.2, 1 - ornament * 0.7)
	const core = lerp(6, 12, 1 - sharp)
	const inner = lerp(14, 24, c)
	const outer = inner + spread

	const arm = makeArm({family, core, inner, outer, sharp})

	const rotations = Array.from({length: symmetry}, (_, i) => {
		const deg = (360 / symmetry) * i
		return svg`<g transform="rotate(${deg})">${arm}</g>`
	})

	const ring =
		ornament > 0.35
			? svg`
				<circle
					cx="0"
					cy="0"
					r="${lerp(inner * 0.62, inner * 0.88, ornament)}"
					opacity="${lerp(0.35, 0.8, ornament)}"
				/>
			`
			: null

	const halo =
		ornament > 0.72
			? svg`
				<circle
					cx="0"
					cy="0"
					r="${outer + lerp(4, 10, ornament)}"
					opacity="${lerp(0.12, 0.28, ornament)}"
				/>
			`
			: null

	const dots = makeDots(symmetry, inner, outer, ornament)

	return svg`
		<svg
			viewBox="-64 -64 128 128"
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="${stroke}"
			aria-hidden="true"
		>
			<g>
				${halo}
				${ring}
				${rotations}
				${dots}

				<circle
					cx="0"
					cy="0"
					r="${lerp(1.4, 3.8, 1 - sharp * 0.5)}"
					fill="currentColor"
					stroke="none"
					opacity="${lerp(0.75, 1, ornament)}"
				/>
			</g>
		</svg>
	`
}

function makeArm({
	family,
	core,
	inner,
	outer,
	sharp,
}: {
	family: number
	core: number
	inner: number
	outer: number
	sharp: number
}) {
	switch (family) {
		case 0:
			return runeArm(core, inner, outer, sharp)
		case 1:
			return petalArm(core, inner, outer, sharp)
		case 2:
			return diamondArm(core, inner, outer, sharp)
		case 3:
			return crownArm(core, inner, outer, sharp)
		default:
			return runeArm(core, inner, outer, sharp)
	}
}

function runeArm(core: number, inner: number, outer: number, sharp: number) {
	const bend = lerp(4, 13, sharp)
	const forkY = lerp(inner * 0.72, inner * 0.9, sharp)
	const tipW = lerp(4, 10, sharp)

	return svg`
		<path d="M 0 -${core} L 0 -${outer}" />
		<path d="M 0 -${forkY} L -${tipW} -${forkY + bend}" />
		<path d="M 0 -${forkY} L ${tipW} -${forkY + bend}" />
		<path d="M 0 -${inner} L -${tipW * 0.65} -${inner - bend * 0.5}" opacity="0.85" />
	`
}

function petalArm(core: number, inner: number, outer: number, sharp: number) {
	const width = lerp(5, 12, 1 - sharp * 0.4)
	const waist = lerp(0.38, 0.62, sharp)
	const y1 = lerp(inner * 0.75, inner * 0.92, sharp)
	const cy = lerp(inner * 0.45, inner * 0.65, sharp)

	return svg`
		<path
			d="
				M 0 -${core}
				Q ${width} -${cy} ${width * waist} -${y1}
				Q ${width * 0.35} -${outer} 0 -${outer}
				Q -${width * 0.35} -${outer} -${width * waist} -${y1}
				Q -${width} -${cy} 0 -${core}
			"
		/>
		<path d="M 0 -${core + 1} L 0 -${outer - 2}" opacity="0.75" />
	`
}

function diamondArm(core: number, inner: number, outer: number, sharp: number) {
	const width = lerp(4, 11, sharp)
	const cross = lerp(inner * 0.72, inner * 0.95, sharp)

	return svg`
		<path
			d="
				M 0 -${core}
				L ${width} -${inner}
				L 0 -${outer}
				L -${width} -${inner}
				Z
			"
		/>
		<path d="M -${width * 0.85} -${cross} L ${width * 0.85} -${cross}" opacity="0.9" />
	`
}

function crownArm(core: number, inner: number, outer: number, sharp: number) {
	const width = lerp(7, 15, 1 - sharp * 0.35)
	const tip = lerp(3, 8, sharp)
	const arcY = lerp(inner * 0.82, inner * 0.95, sharp)

	return svg`
		<path
			d="
				M -${width} -${arcY}
				Q 0 -${outer * 0.82} ${width} -${arcY}
			"
		/>
		<path d="M 0 -${core} L 0 -${outer}" />
		<path d="M 0 -${outer} L -${tip} -${outer + tip}" />
		<path d="M 0 -${outer} L ${tip} -${outer + tip}" />
	`
}

function makeDots(symmetry: number, inner: number, outer: number, ornament: number) {
	if (ornament < 0.5)
		return null

	const count = symmetry
	const r = outer + lerp(2, 8, ornament)
	const dotRadius = lerp(0.8, 2.1, ornament)

	return Array.from({length: count}, (_, i) => {
		const angle = ((Math.PI * 2) / count) * i - Math.PI / 2
		const x = Math.cos(angle) * r
		const y = Math.sin(angle) * r
		return svg`
			<circle
				cx="${x}"
				cy="${y}"
				r="${dotRadius}"
				fill="currentColor"
				stroke="none"
				opacity="${lerp(0.55, 0.95, ornament)}"
			/>
		`
	})
}

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t
}

