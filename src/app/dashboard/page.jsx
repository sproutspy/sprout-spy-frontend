"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, {useState, useEffect} from 'react';
import {Flex, Stack, Spinner, Text, Grid, GridItem} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import DataChart from 'src/components/DataChart';

function DashboardPage() {
    const supabase = createClientComponentClient()
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [plants, setPlants] = useState([]);
    

    useEffect(() => {
      supabase.auth.getUser().then((response) => {
        console.log(response.data.user)
        if (!response.data.user) {
          router.push('/sign-in');
          return;
        }
        supabase.from('plants').select().eq('owner_id', response.data.user.id).then((response) => {
            console.log('plants')
            console.log(response.data)
            setPlants(response.data);
        });
        setUser(response.data.user);
        setLoading(false);
      });
    }, []);

    if (loading) {
      return (
        <Flex justify="center" align="center" h="100vh">
          <Stack spacing={4}>
            <Spinner size="xl" thickness='4px' color={"green.400"} />
          </Stack>
        </Flex>
      );
    }

    if (!user) {
      router.push('/sign-in');
    }

    return (
      <Stack color="white" align="center">
        <Text fontWeight="semibold" fontSize="4rem" p="1rem">Dashboard</Text>
        <Grid
          templateColumns={{sm: 'repeat(2, 1fr)', md: "repeat(4, 1fr)"}}
          gap="3rem"
          w="100%"
          p="3rem"
        >
            {plants.length > 0 && plants.map((plant) => {
                let tempData = plant.temperature_data;
                let tempValues = [];
                let tempLabels = [];
                tempData.map((data) => {
                    tempValues.push(data.value);
                    tempLabels.push(data.date);
                });
                let humidityData = plant.humidity_data;
                let humidityValues = [];
                let humidityLabels = [];
                humidityData.map((data) => {
                    humidityValues.push(data.value);
                    humidityLabels.push(data.date);
                });
                let lightData = plant.light_data;
                let lightValues = [];
                let lightLabels = [];
                lightData.map((data) => {
                    lightValues.push(data.value);
                    lightLabels.push(data.date);
                });
                let airPressureData = plant.air_pressure_data;
                let airPressureValues = [];
                let airPressureLabels = [];
                airPressureData.map((data) => {
                    airPressureValues.push(data.value);
                    airPressureLabels.push(data.date);
                });
                let soilMoistureData = plant.soil_moisture_data;
                let soilMoistureValues = [];
                let soilMoistureLabels = [];
                soilMoistureData.map((data) => {
                    soilMoistureValues.push(data.value);
                    soilMoistureLabels.push(data.date);
                });


                return (
                    <>
                    <DataChart title="Temperature" data={{
                        labels: tempLabels,
                        datasets: [
                            {
                                label: 'Data',
                                data: tempValues,
                                fill: false,
                                backgroundColor: '#68D391',
                                borderColor: '#68D391',
                                tension: 0.1,
                            },
                        ],
                    }} />
                    <DataChart title="Humidity" data={{
                        labels: humidityLabels,
                        datasets: [
                            {
                                label: 'Data',
                                data: humidityValues,
                                fill: false,
                                backgroundColor: '#68D391',
                                borderColor: '#68D391',
                                tension: 0.1,
                            },
                        ],
                    }} />
                    <DataChart title="Light" data={{
                        labels: lightLabels,
                        datasets: [
                            {
                                label: 'Data',
                                data: lightValues,
                                fill: false,
                                backgroundColor: '#68D391',
                                borderColor: '#68D391',
                                tension: 0.1,
                            },
                        ],
                    }} />
                    <DataChart title="Air Pressure" data={{
                        labels: airPressureLabels,
                        datasets: [
                            {
                                label: 'Data',
                                data: airPressureValues,
                                fill: false,
                                backgroundColor: '#68D391',
                                borderColor: '#68D391',
                                tension: 0.1,
                            },
                        ],
                    }} />
                    <DataChart title="Soil Moisture" data={{
                        labels: soilMoistureLabels,
                        datasets: [
                            {
                                label: 'Data',
                                data: soilMoistureValues,
                                fill: false,
                                backgroundColor: '#68D391',
                                borderColor: '#68D391',
                                tension: 0.1,
                            },
                        ],
                    }} />

                    </>
                    
                );
            })}
            
            
        </Grid>

      </Stack>
    );

}

export default DashboardPage;