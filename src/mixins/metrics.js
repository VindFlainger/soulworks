export default {
    props: {
        maxWidth: {
            type: [String, Number],
            default: 'auto',
            validator: v => {
                return /^(?:auto$|\d+(?:px|rem|%|em|$))/.test(v)
            }
        },
        minWidth: {
            type: [String, Number],
            default: 'auto',
            validator: v => {
                return /^(?:auto$|\d+(?:px|rem|%|em|$))/.test(v)
            }
        }
    },
    computed: {
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