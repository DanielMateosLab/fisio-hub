import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import React from 'react'

interface Props {
  auxiliaryText: string
  linkText: string
  href: string
}

const SwitchAuthFooter = ({ auxiliaryText, linkText, href }: Props) => (
  <>
    <Typography style={{ marginTop: "24px" }} variant="subtitle1" align="center" gutterBottom>
    { auxiliaryText }
    <Link href={href}>
      { linkText }
    </Link>
    </Typography>
  </>
)

export default SwitchAuthFooter