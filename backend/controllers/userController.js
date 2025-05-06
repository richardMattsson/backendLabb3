const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json({ users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fel vid hämtning av användare',
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUser(id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Fel vid hämtning av användare med ID: ${id}`,
      error: error.message,
    });
  }
};

exports.getUserTasksRole = async (req, res) => {
  const { id } = req.params;
  try {
    const performer = await userService.getUserTasksRole(id, 'utförare');
    const client = await userService.getUserTasksRole(id, 'beställare');
    res.json({ utförare: performer, beställare: client });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Fel vid hämtning av användarens uppgifter med ID: ${id}`,
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, phone, email, city } = req.body;
  if (!firstName || firstName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Förnamn är obligatoriskt',
    });
  }
  if (!lastName || lastName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Efternamn är obligatoriskt',
    });
  }
  if (!phone || phone.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Telefonnummer är obligatoriskt',
    });
  }
  if (!email || email.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'E-postadress är obligatorisk',
    });
  }
  if (!city || city.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Stad är obligatorisk',
    });
  }
  try {
    await userService.createUser(firstName, lastName, phone, email, city);
    res.status(201).json({ success: true, message: 'Ny användare tillagd!' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fel vid skapande av användare',
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, email, city } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Användar-ID är obligatoriskt',
    });
  }
  if (!firstName || firstName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Förnamn är obligatoriskt',
    });
  }
  if (!lastName || lastName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Efternamn är obligatoriskt',
    });
  }
  if (!phone || phone.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Telefonnummer är obligatoriskt',
    });
  }
  if (!email || email.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'E-postadress är obligatorisk',
    });
  }
  if (!city || city.trim().length < 1) {
    return res.status(400).json({
      success: false,
      message: 'Stad är obligatorisk',
    });
  }

  try {
    await userService.updateUser(id, firstName, lastName, phone, email, city);
    res.status(200).json({ success: true, message: 'Användare uppdaterad!' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Fel vid uppdatering av användare med ID: ${id}`,
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Användar-ID är obligatoriskt',
    });
  }

  try {
    await userService.deleteUser(id);
    res.status(200).json({ success: true, message: 'Användare borttagen!' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Fel vid borttagning av användare med ID: ${id}`,
      error: error.message,
    });
  }
};
