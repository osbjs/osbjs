import { Hitsound } from '../Enums/Hitsound'
import { CurveType } from '../Enums/CurveType'
import { IHitSample } from './IHitSample'
import { Vector2 } from '../../Math'

export interface ISliderParams {
	curveType: CurveType | string
	curvePoints: Vector2[]
	slides: number
	length: number
	edgeSounds: Hitsound[]
	edgeSets: IHitSample[]
}
