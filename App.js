import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

export default function App() {

  doPayment = async () => {
    Stripe.setOptionsAsync({
      publishableKey:  "Stripe Publishable Key", // Your key
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      // merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });

    const shippingMethods = [
      {
        id: 'fedex',
        label: 'FedEX',
        detail: 'Test @ 10',
        amount: '10.00',
      },
    ];
    
    const options = {
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: 'Gunilla Haugeh',
          line1: 'Canary Place',
          line2: '3',
          city: 'Macon',
          state: 'Georgia',
          country: 'US',
          postalCode: '31217',
        },
      },
      shippingMethods,
    };
    
    try {
      const token = await Stripe.paymentRequestWithCardFormAsync(options);
      console.log(token);
      Alert.alert("Payment successfully")
      // Client specific code
      // api.sendTokenToBackend(token)
    
      // You should complete the operation by calling
    } catch (error) {
      Alert.alert("Payment fail");
      // Or cancel if an error occurred
      // stripe.cancelApplePayRequestAsync()
    }
  }
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.button} onPress={doPayment} >
        <Text >
          Payment
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { 
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});
