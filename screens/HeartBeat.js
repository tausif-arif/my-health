import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {FAB} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {BarChart, Grid} from 'react-native-svg-charts';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const HeartBeat = () => {
  const [heartBeat, setheartBeat] = useState('');
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [bar, setBar] = useState(false);

  const [modal, setModal] = useState(false);
  const getData = {inputData: heartBeat, time: date};

  const fill='rgb(29, 165, 244)';
  const barData=[...data.map((data)=>data.inputData)];


  const loadGraphData=()=>{
    setBar(true)
 // barData=[70,30,20,40,70]
    // barData=data.map((data,index)=>{return(data.inputData)})
    console.log('bardata',barData)
    console.log(data)
  }

  const getday = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
   
    setOpen(false);
  };

  const addHeartRate = () => {
    // console.log()
    if (heartBeat) {
      setData([...data, getData]);
      setheartBeat('');
      setModal(false);
    } else {
      alert('please add data');
    }
  };
 // console.log(data)

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
        <Text style={{color:'grey'}}>HeartBeat</Text>
      </View>
      <View style={{flex: 2.5}}>
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
      </View>
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
                placeholder="enter your heartBeat"
                value={heartBeat}
                onChangeText={e => setheartBeat(e)}
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
                onPress={() => addHeartRate()}
                title="Add"
                color="purple"
              />
            </View>
          </View>
        </Modal>
        <Modal visible={bar} transparent={true}>
        <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          <View style={styles.barView}>
         
          <TouchableOpacity style={styles.barClose} onPress={()=>setBar(false)}><Text>❌ </Text></TouchableOpacity>
          <BarChart style={{ height: 300,marginTop:30 }} data={barData} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>


          <Grid />
      </BarChart>
          </View>
          </View>
        </Modal>
      </View>

      <View style={{flex: 1}}>
        <FAB
          style={styles.fabBar}
          medium
          icon="chart-bar"
          onPress={() => loadGraphData()}
        />
        <FAB
          style={styles.fabAdd}
          medium
          icon="plus"
          onPress={() => setModal(true)}
        />
      </View>
    </View>
  );
};
export default HeartBeat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Roboto-Black',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // fontFamily:'Roboto-Black'

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

  fabAdd: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 0,
  },
  fabBar: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 65,
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
  barView: {
    backgroundColor: '#ffffff',
    height: 450,
    padding: 20,
    marginTop: 40,
   // justifyContent: 'space-around',
    borderRadius: 6,
    width: '80%',
  },
  barClose:{
    position: 'absolute',
    margin: 20,
    right: 0,
  }
});
