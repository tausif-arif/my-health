import React, { useState } from 'react'
import {  Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Modal, } from 'react-native';
    import {FAB} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const SpO2 = () => {


    const [spO2, setSpO2] = useState('');
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const getData = {inputData: spO2, time: date};
  
    const getday = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      console.log(
        currentDate.getDate() + currentDate.getDay() + currentDate.getFullYear(),
      );
      setOpen(false);
    };
  
    const addSpO2 = () => {
     
      if(spO2){
      setData([...data, getData]);
      setSpO2('')
      setModal(false);
      }
      else {
        alert('please add data')
      }
    };
  
  
    return (
              <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 15,
            }}>
            <Text style={{color:'grey'}}>S.No</Text>
            <Text style={{color:'grey'}}>Date</Text>
            <Text style={{color:'grey'}}>SpO2</Text>
          </View>
          <ScrollView>
            {data.map((elm, index) => {
              return (
                <View key={index} style={styles.content}>
                  <View>
                    <Text style={{fontSize: 20, color: '#000'}}>
                      {index + 1 + '.'}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 25,
                        color: '#000',
                      }}>{`${elm.time.getDate()}/${
                      elm.time.getMonth() + 1
                    }/${elm.time.getFullYear()}`}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 30, color: '#000'}}>
                      {elm.inputData}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View>
            <Modal visible={modal} transparent={true}>
              <View
                style={{
                  backgroundColor: '#000000aa',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.modalView}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="enter your SpO2"
                    value={spO2}
                    onChangeText={e => setSpO2(e)}
                  />
                  <Button title="Add Date" onPress={() => setOpen(true)} />
                  {open && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      display="default"
                      onChange={getday}
                    />
                  )}
                  <Button
                    style={{marginTop: 15}}
                    onPress={() => addSpO2()}
                    title="Add"
                    color="purple"
                  />
                </View>
              </View>
            </Modal>
          </View>
          <View style={{flex: 2}}>
            <FAB
              style={styles.fab}
              medium
              icon="plus"
              onPress={() => setModal(true)}
            />
          </View>
        </View>
      );
                  }
    export default SpO2;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      content: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    
        margin: 10,
        padding: 10,
        fontSize: 25,
        shadowColor: '#000000',
        elevation: 4,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
      inputField: {
        textAlign: 'center',
        marginTop: 20,
        padding: 10,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
      },
    
      fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
      },
      modalView: {
        backgroundColor: '#ffffff',
        height: 200,
        padding: 25,
        marginTop: 40,
        justifyContent: 'space-around',
        borderRadius: 6,
        width: '80%',
      },
    });

