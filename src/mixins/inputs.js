import {_vMetric} from "../../utils/validators";

export default  {
    props: {
        required: {
            type: Boolean,
            default: true
        },
        minWidth: {
            type: [Number, String],
            default: 270,
            validator: _vMetric
        },
        maxWidth: {
            type: [Number, String],
            default: 300,
            validator: _vMetric
        },
    },
    computed:{
        $maxWidth() {
            if (Number.isInteger(this.maxWidth)) return this.maxWidth + 'px'
            return /^\d+$/.test(this.maxWidth) ? this.maxWidth + 'px' : this.maxWidth
        },
        $minWidth() {
            if (Number.isInteger(this.minWidth)) return this.minWidth + 'px'
            return /^\d+$/.test(this.minWidth) ? this.minWidth + 'px' : this.minWidth
        }
    }

}