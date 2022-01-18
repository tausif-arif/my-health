import React, { useEffect, useState } from 'react'
import {  Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Modal,
    TouchableOpacity, } from 'react-native';
    import {FAB} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  
  BarChart,
 
} from "react-native-chart-kit";




const Temperature = () => {

    const [temp, setTemp] = useState('');
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [bar, setBar] = useState(false);


  const getData = {inputData: temp, time: date};

  const getday = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    
    setOpen(false);
  };

  const addTemp = () => {
    
    if(temp){
    setData([...data, getData]);
    setTemp('')
    setModal(false);
    }
    else {
        alert('please add data')
      }
  };


  // let barData = {
  //   labels: [],
  //   datasets: [
  //     {
  //       data:[{
  //         data.map((data)=>data.inputData)}]
  //     }
  //   ]
  // };
  
   const chartConfig = {
    backgroundColor: "#fff",
      backgroundGradientFrom: "#238c00",
      backgroundGradientTo: "#8ddef6",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 0.8) => `rgba(32, 36, 36, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "8",
        strokeWidth: "6",
        stroke: "#fea726"
      }
    
    
   
   };
  const  showGraph=()=>{
    // barData.labels=data.map((data)=>data.time.getDate())
    // barData.datasets[0].data=data.map((data)=>data.inputData)
    // console.log(barData.labels)
    // console.log(barData.datasets[0].data)
    setBar(true)

  }
  // useEffect(() => {
  //   console.log(barData.labels)

  //   console.log(barData.datasets[0].data)

    
  // }, [data])


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
          <Text style={{color:'grey'}}>Temperature</Text>
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
                  placeholder="enter your temperature"
                  value={temp}
                  onChangeText={e => setTemp(e)}
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
                  onPress={() => addTemp()}
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
            <BarChart
          ///style={graphStyle}
            data={{
              labels:[
                ...data.map((elm)=>elm.time.getDate())
              ],
              datasets:[{
                data:data.map((elm)=>elm.inputData)
              }]
            }}
            width={270}
            height={400}
            yAxisLabel=""
            //xAxisLabel={data.map((elm)=>elm.time.toLocaleString("en-US", { month: "short" }))}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            style={{ height: 250 }}
          />
            </View>
            </View>
          </Modal>
        </View>
        <View style={{flex: 1}}>
        <FAB
        style={styles.fabBar}
        medium
        icon="chart-bar"
        onPress={() => showGraph()}
      />
      
          <FAB
            style={styles.fab}
            medium
            icon="plus"
            onPress={() => setModal(true)}
          />
        </View>
      </View>
    );
  };
  export default Temperature;
  
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
      marginTop: 30,
           borderRadius: 6,
      width: '85%',
    },
    barClose:{
      position: 'absolute',
      margin: 20,
      right: 0,
    }
  });
  
  

