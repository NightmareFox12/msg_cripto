'use strict';

export const POST = async request => {
  const { addressInput, signner } = await request.json();

  if (!/^0x[a-fA-F0-9]{40}$/.test(addressInput) && addressInput.length > 42) return Response.json({ msg: '¡Address no válida!' });
  else if (addressInput === signner.address) return Response.json({ msg: '¡No puede envíarse un mensaje a sí mismo!' });
  else return Response.json({ msg: 'ok' });
};