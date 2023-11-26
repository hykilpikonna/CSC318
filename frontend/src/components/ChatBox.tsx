import ChatBoxBorder from '../assets/img/chatbox-border.svg';

interface ChatBoxProps {
  msg: string;
}

export default function ChatBox({msg}: ChatBoxProps) {

  return <div className='round box h-min no-shadow relative min-h-[60px] flex items-center justify-center mx-5'>
    <img src={ChatBoxBorder} alt="" className="absolute left-0 translate-x-[-100%] bottom-2" />
    {msg}
  </div>
}
