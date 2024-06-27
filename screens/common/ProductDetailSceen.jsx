// ... (other imports)
import { Text } from 'react-native';

// ... (ImageCarousel component)

const ProductDetailSceen = () => {
    return (
        <View style={{ flex: 1 }}> {/* Added flex: 1 to ensure it takes the full screen */}
            <ImageCarousel
                images={[
                    'https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80',
                    'https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80',
                    // ...more images
                ]}
            />
        </View>
    )
}

// ... (styles)

export default ProductDetailSceen;
