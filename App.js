import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

import MusicFiles from 'react-native-get-music-files';
import {PERMISSIONS, request} from 'react-native-permissions';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const App = () => {
  const [step, setStep] = useState(0);
  const [songList, setSongList] = useState([]);
  const [playingSong, setPlayingSong] = useState('');
  const [s, setS] = useState('');
  console.log('s', s);
  const songs = [
    {
      name: 'Munbe va',
      author: 'Shreya Goshal',
      duration: 6.06,
    },
    {
      name: 'Enodu ne Irunthal',
      author: 'Sid Sriram',
      duration: 4.56,
    },
    {
      name: 'Vathi Raid',
      author: 'Arivu',
      duration: 4.06,
    },
    {
      name: 'Quit Panuda',
      author: 'Anirudh',
      duration: 5.6,
    },
    {
      name: 'Bujju',
      author: 'Dhanush',
      duration: 4.09,
    },
    {
      name: 'Rakita Rakita',
      author: 'Santhosh Narayanan',
      duration: 5.6,
    },
    {
      name: 'Thalli Pogathey',
      author: 'Sid Sriram',
      duration: 5.6,
    },
  ];
  const [permission, setPermission] = useState();
  console.log(songList[0]);

  const getSongs = () => {
    Alert.alert('seen');
    MusicFiles.getAll({})
      .then((tracks) => {
        console.log(tracks, 'tr');
        setSongList(tracks);
      })
      .catch((error) => {
        console.log(error, 'err');
      });
  };

  useEffect(() => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(
      (result) => console.log('result', result),
      getSongs(),
    );
  }, []);

  const playSound = (sound) => {
    console.log('sound :>> ', sound);

    const soundVar = new Sound(sound, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('Cannot Play Sound');
      }
    });
    setS(soundVar);

    if (s !== '') s.stop();
    setTimeout(() => {
      soundVar.play();
    }, 200);

    // soundVar.isPlaying()
    soundVar.release();
  };

  const pauseSound = (sound) => {
    console.log('sound :>> ', sound);
    const soundVar = new Sound(sound, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('Cannot Play Sound');
      }
    });
    if (s.isPlaying()) s.pause();
    else s.play();

    soundVar.release();
  };

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'red',
    //   }}>
    //   <TouchableOpacity onPress={getSongs}>
    //     <Text>get songs</Text>
    //   </TouchableOpacity>
    //   {songList.map((sound, index) => {
    //     if (sound !== null)
    //       return (
    //         <TouchableOpacity
    //           key={index}
    //           onPress={() => playSound(sound.path)}>
    //           <Text>{sound.fileName}</Text>
    //         </TouchableOpacity>
    //       );
    //   })}
    // </View>
    <>
      {step == 0 ? (
        <ScrollView
          style={{
            backgroundColor: '#FEE2E8',
            flex: 1,
            display: 'flex',
            // justifyContent: 'space-between',
          }}>
          <StatusBar backgroundColor="#FEE2E8" />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              paddingTop: 50,
              paddingHorizontal: 30,
            }}>
            <TouchableOpacity>
              <View>
                <Icon name="left" color="#C8586A" size={20} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{color: '#C8586A', fontSize: 20}}>Most Popular</Text>
            </View>
            <View>
              <FontAwesome name="bars" color="#C8586A" size={20} />
            </View>
          </View>
          <View>
            {songList.map((song, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    playSound(song.path);
                    setPlayingSong(song);
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 30,
                      paddingBottom: 20,
                    }}>
                    <View>
                      <Text style={{fontSize: 20, color: '#C8586A'}}>
                        {song.fileName}
                      </Text>
                      <Text style={{color: '#E05C76'}}>{song.author}</Text>
                    </View>

                    <View>
                      <Text style={{color: '#E05C76'}}>{song.duration}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              backgroundColor: '#F6B9C7',
              // height: 110,
              paddingVertical: 25,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              borderColor: '#fEE2E8',
              borderWidth: 1,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 30,
              }}>
              {playingSong !== '' ? (
                <View>
                  <Text style={{fontSize: 20, color: '#C8586A'}}>
                    {playingSong.fileName}
                  </Text>
                  <Text style={{color: '#E05C76'}}>{playingSong.author}</Text>
                </View>
              ) : (
                <View>
                  <Text style={{fontSize: 20, color: '#C8586A'}}>
                    Rakita Ralita
                  </Text>
                  <Text style={{color: '#E05C76'}}>Dhanush</Text>
                </View>
              )}

              <View style={{borderStartColor: 'red'}}>
                <Icon
                  name="pause"
                  color="#FFFFFF"
                  onPress={() => {
                    // playSound(playingSong.path);
                    pauseSound(playingSong.path);
                  }}
                  size={25}
                  style={{
                    backgroundColor: '#E5A5B2',
                    padding: 15,
                    fontWeight: 'bold',
                    borderRadius: 50,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            display: 'flex',
            backgroundColor: '#FEE2E8',
            justifyContent: 'space-between',
          }}>
          <StatusBar backgroundColor="#FEE2E8" />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              paddingTop: 50,
              height: 200,
              paddingHorizontal: 30,
            }}>
            <TouchableOpacity onPress={() => setStep(0)}>
              <View>
                <Icon name="left" color="#C8586A" size={20} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{color: '#C8586A', fontSize: 20}}>Playing Now</Text>
            </View>
            <View>
              <FontAwesome name="bars" color="#C8586A" size={20} />
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingBottom: 50,
              }}>
              <Image
                style={{
                  height: 270,
                  width: 270,
                  borderRadius: 135,
                }}
                source={{
                  uri:
                    'https://images.all-free-download.com/images/graphicthumb/pink_fantasy_roses_background_picture_166708.jpg',
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View style={{borderStartColor: 'red'}}>
                <FontAwesome
                  name="repeat"
                  color="#E5A5B2"
                  size={25}
                  style={{
                    padding: 18,
                    fontWeight: 'bold',
                    borderRadius: 50,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{fontSize: 25, color: '#C8586A', textAlign: 'center'}}>
                  Rakita Ralita
                </Text>
                <Text style={{color: '#E05C76', textAlign: 'center'}}>
                  Dhanush
                </Text>
              </View>
              <View style={{borderStartColor: 'red'}}>
                <MaterialCommunityIcons
                  name="heart-multiple"
                  color="#E5A5B2"
                  size={25}
                  style={{
                    padding: 18,
                    fontWeight: 'bold',
                    borderRadius: 50,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 5,
                marginTop: 30,
                backgroundColor: '#FEE2Eb',
                borderRadius: 20,
              }}>
              <View
                style={{
                  width: '50%',
                  height: 5,
                  backgroundColor: '#E5A5B2',
                  borderRadius: 20,
                }}></View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFF',

              justifyContent: 'space-between',
              paddingBottom: 70,
              paddingHorizontal: 30,
            }}>
            <View style={{borderStartColor: 'red'}}>
              <Icon
                name="banckward"
                color="#E5A5B2"
                size={20}
                style={{
                  backgroundColor: '#FEE2Eb',
                  padding: 18,
                  fontWeight: 'bold',
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{borderStartColor: 'red'}}>
              <Icon
                name="pause"
                color="#FFFFFF"
                size={40}
                style={{
                  backgroundColor: '#E5A5B2',
                  padding: 25,
                  fontWeight: 'bold',
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{borderStartColor: 'red'}}>
              <Icon
                name="forward"
                color="#E5A5B2"
                size={20}
                style={{
                  backgroundColor: '#FEE2Eb',

                  padding: 18,
                  fontWeight: 'bold',
                  borderRadius: 50,
                }}
              />
            </View>
          </View>
          {/* </View> */}
        </View>
      )}
    </>
  );
};

export default App;
