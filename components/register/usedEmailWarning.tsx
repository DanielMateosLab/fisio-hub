import Typography from '@material-ui/core/Typography'
import React from 'react'

const UsedEmailWarning: React.FC = (props) => {
  return (
    <>
      <Typography gutterBottom>
        Vaya, el correo electrónico ya está registrado.
        {props.children}
        o utiliza otro email.
      </Typography>
      <Typography variant="body2">¿Sorprendido? No te preocupes, probablemente otro centro en el que trabajes o del que
        seas paciente utilice nuestra plataforma. Puedes utilizar el mismo correo con todos tus usuarios, si bien la
        información y los datos son independientes.</Typography>
    </>
  )
}
export default  UsedEmailWarning