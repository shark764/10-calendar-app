import { useCallback, useEffect, useRef } from 'react';

interface Props {
  userDeviceId: string;
  onPermissionError: (error: Error) => void;
}

const InputMeter = ({ userDeviceId, onPermissionError }: Props) => {
  // const mediaDeviceId = useRef(deviceId);
  const localStream = useRef<MediaStream | null>(null);

  const devices = [{ id: '1234' }, { id: '9876' }];
  const defaultDevice = devices.find((device) => device.id === '6755');

  const getMicrophoneVolume = useCallback(
    (deviceId: string) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId,
          },
          video: false,
        })
        .then((mediaStream) => {
          localStream.current = mediaStream;

          console.log({
            localStream: localStream.current,
            tracks: localStream.current.getTracks(),
            track: localStream.current?.getTracks().at(0)?.id,
          });
        })
        .catch((err) => {
          console.error(err);
          onPermissionError(err as Error);
        });
    },
    [onPermissionError]
  );
  useEffect(() => {
    getMicrophoneVolume(userDeviceId);

    return () => {
      localStream.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [getMicrophoneVolume, localStream, userDeviceId]);

  return (
    <div>
      {defaultDevice?.id !== undefined ? <p>Hey</p> : <p>no hey</p>}
      <span>{userDeviceId}</span>
    </div>
  );
};

export default InputMeter;
