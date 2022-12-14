import { Component } from 'react';

// Styles
import '../../styles/RentalsDashboard.css';

// Models
import rentalLogsModel from '../../../../models/rentals/RentalLogsModel';

// View Components
import Dropdown from '../../../_components/dropdown/Dropdown.component';
import AgeDemographics from '../../view-components/charts/age-demographics/AgeDemographics.component';
import EventBus from '../../../../events/_event-bus/_EventBus';
import EventRegistry from '../../../../events/event-registry/EventRegistry';

class MarketAnalytics extends Component {
  
  constructor(props) {
    super(props);
    console.log('constructor()');

    const rentalLogs = new rentalLogsModel();

    this.state = {
      searchField:"",
      selectedLocationId:"",
      locationOptions:[],
      rentalLogs: rentalLogs
    };
  }

  componentDidMount() {
    console.log('componentDidMount()');
    this.state.rentalLogs.fetchData().then(
      (model) => {
        this.setState(
          {locationOptions: model.getLocationsArray(), 
            selectedLocationId: model.getDefaultLocationId()}
            );
            EventBus.publish(EventRegistry.finishedLoading, {});
      }
    );
  }


  render() {
    console.log('render()');

    return (
            <div className="page-wrapper">

              <h3>Marketing Analytics </h3>
              <p>Select a location from the dropdown menu to see the age distributions.</p>


              <Dropdown
                onChangeHandler={this.#onSelectLocation}
                className="test" 
                name="locations"
                options={this.state.locationOptions}
                defaultSelectedId={this.state.selectedLocationId}/>

              <AgeDemographics rentalLogs={this.state.rentalLogs} locationId={this.state.selectedLocationId}/>

            </div>
          );
  }

  /**
   * Usage example: onChangeHandler={this.onSelectLocation.bind(this)}
   * @param {*} event 
   */
   onSelectLocation(event) {
    const selectLocationId = event.target.value.toLocaleLowerCase();
    this.setState({selectedLocationId:selectLocationId});
  }
  
  /**
   * # tells javascript that this is a private function
   * The Arrow function definition does not need .bind(this)
   * Usage example: onChangeHandler={this.#onSelectLocation}
   * @param {*} event 
   */
  #onSelectLocation = (event) => {
    const selectLocationId = event.target.value.toLocaleLowerCase();
    this.setState({selectedLocationId:selectLocationId});
  }

}

export default MarketAnalytics;