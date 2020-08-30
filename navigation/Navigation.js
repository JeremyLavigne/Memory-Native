import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../components/Home'
import Game from '../components/Game'


const HomeStackNavigator = createStackNavigator({
    Home: { 
        screen: Home,
        navigationOptions: {
          title: 'Home'
        }
      },
  Game: {
      screen: Game,
      navigationOptions: {
          title: 'Game'
      }
  }
})

export default createAppContainer(HomeStackNavigator);