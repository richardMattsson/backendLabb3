const userService = require("../services/userService")

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

exports.getUserTasksByRole = async (req, res) => {
  const { userId, taskrole } = req.params;

  if (!userId || !taskrole) {
    return res.status(400).json({
      success: false,
      message: 'Både userId och taskrole är obligatoriska',
    });
  }
  try {
    const userTasksRole = await userService.getUserTasksByRole(userId, taskrole);

    if(!userTasksRole || userTasksRole.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Inga uppdrag hittades för användare med ID: ${userId} och roll: ${taskrole}`,
        userTasksRole: [],
      });
    }
    res.status(200).json({
      success: true,
      message: `Uppdrag hämtade för användare med ID: ${userId} och roll: ${taskrole}`,
       userTasksRole,
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Fel vid hämtning av användarens uppdrag med ID: ${userId} och roll: ${taskrole}`,
      error: error.message,
    });
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params
  try {
    const user = await userService.getUserByEmail(email)
    if (!user) {
      return res.status(404).json({
        message: "Användare med den angivna e-postadressen hittades inte",
      })
    }
    res.json({ user})
  } catch (error) {
    res.status(500).json({
      message: "Fel vid hämtning av användare med e-postadress",
      error: error.message,
    })
  }
}

exports.createUser = async (req, res) => {
  const { firstName, lastName, phone, email, city } = req.body;
  try {
    await userService.createUser(firstName, lastName, phone, email, city);
    res.status(201).json({ success: true, message: "Ny användare tillagd!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fel vid skapande av användare',
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const result = await userService.updateUser(userId, updatedData);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: 'Användardata uppdaterad!',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Användaren hittades inte`,
      });
    }
  } catch (error) {
    console.error('Fel vid uppdatering av användare:', error);
    return res.status(500).json({
      success: false,
      message: `Fel vid uppdatering av användardata`,
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
      message: `Fel vid borttagning av användare`,
      error: error.message,
    });
  }
};

exports.getUserCount = async (req, res) => {
  try {
  const count = await userService.getUserCount()
  res.json({ userCount: count })
   } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Fel vid hämtning av användartal',
        error: error.message,
      });
    }
  };
