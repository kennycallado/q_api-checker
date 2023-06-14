import routes from './routing'
import { app } from '../main'

const PORT: number = parseInt(process.env.PORT || '3000')

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
