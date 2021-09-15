
import React from "react";
import withPhotos from "components/withPhotos";

class Favorites extends React.Component {

    render() {
        console.log(this.props.config.likedPhotos, 'fav photos')
        //check which page is rendering maybe pass as component with Photos favorites
        return (
            <div>Favorites
                <div>page</div>
            </div>


        )
    }
}
export default withPhotos(Favorites);