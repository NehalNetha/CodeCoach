import mongoose from "mongoose";

const federatedCredentialSchema = new mongoose.Schema({
  provider: String,
  subject: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  profileImage: String,
  federated_credentials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FederatedCredential' }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const FederatedCredential = mongoose.models.FederatedCredential || mongoose.model('FederatedCredential', federatedCredentialSchema);

export { User, FederatedCredential };