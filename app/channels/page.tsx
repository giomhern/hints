"use client";

import { useEffect } from "react";
import { supabase } from "../supabase";

const GamePage = () => {

  useEffect(() => {
    console.log("Active channels after subscribing:", supabase.getChannels());
    console.log("Cleaning up channels", supabase.removeAllChannels());
    console.log("Active channels after cleanup:", supabase.getChannels());
    
    return () => {
      supabase.removeAllChannels();
      console.log("Active channels after cleanup:", supabase.getChannels());
    };
  }, []);

  return <div>Game Page: Check the console for channel activity.</div>;
};

export default GamePage;
