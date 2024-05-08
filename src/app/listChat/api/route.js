'use strict';

export const POST = async request => {
  const addressReceiver = await request.json();

  if (!/^0x[a-fA-F0-9]{40}$/.test(addressReceiver) && addressReceiver.length > 42) return Response.json({ msg: '¡Address no válida!' });
  else return Response.json({ msg: 'ok' });
};